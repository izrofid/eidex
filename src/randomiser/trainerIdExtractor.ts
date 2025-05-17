const CHUNK_SIZE = 0x1000; // 4096
export const MGBA_SIZE = 0x20010; // 131088
export const TOTAL_SIZE = 0x20000; // 131072
const NUM_CHUNKS = 32;
const SIGNATURE = 0x08012025;

type SectorInfo = {
  id: number;
  checksum: number;
  signature: number;
  counter: number;
  validSignature: boolean;
  raw: Uint8Array;
};

export function splitSaveIntoChunks(arrayBuffer: ArrayBuffer): SectorInfo[] {
  if (arrayBuffer.byteLength === MGBA_SIZE) {
    // Trim the extra 8 bytes at the end (mGBA footer)
    arrayBuffer = arrayBuffer.slice(0, TOTAL_SIZE);
  }
  if (arrayBuffer.byteLength < TOTAL_SIZE) {
    throw new Error("Save file must be at least 128KB");
  }

  const chunks: SectorInfo[] = [];

  for (let i = 0; i < NUM_CHUNKS; i++) {
    const start = i * CHUNK_SIZE;
    const raw = new Uint8Array(arrayBuffer.slice(start, start + CHUNK_SIZE));
    const id = raw[4084] | (raw[4085] << 8);
    const checksum = raw[4086] | (raw[4087] << 8);
    const signature =
      raw[4088] | (raw[4089] << 8) | (raw[4090] << 16) | (raw[4091] << 24);
    const counter =
      raw[4092] | (raw[4093] << 8) | (raw[4094] << 16) | (raw[4095] << 24);

    chunks.push({
      id,
      checksum,
      signature,
      counter,
      validSignature: signature === SIGNATURE,
      raw,
    });
  }

  return chunks;
}

export function getTrainerIdFromSectors(sectors: SectorInfo[]) {
  const sector = sectors.find((s) => s.id === 0 && s.validSignature);
  if (!sector) throw new Error("No valid sector with id = 0");

  const data = sector.raw;
  const trainerId = data[0x0a] | (data[0x0b] << 8);
  const secretId = data[0x0c] | (data[0x0d] << 8);
  const fullId = (secretId << 16) | trainerId;

  return {
    trainerId,
    secretId,
    fullId,
    sectorIndex: sectors.indexOf(sector),
  };
}
