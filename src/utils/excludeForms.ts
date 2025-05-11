  const excludeForms = (forms: string[] | null | undefined): boolean => {
    const bannedForms = ["totem", "gigantamax"];
    if (!forms) return false;
    return forms.some((form) => bannedForms.includes(form));
  };

  export default excludeForms