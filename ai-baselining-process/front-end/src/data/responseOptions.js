export const NOT_APPLICABLE_OPTION = "Not Applicable";
export const NOTES_OPTION = "Notes";
export const LEGACY_OTHER_OPTION = "Other";

export function isNotApplicableOption(value) {
  return value === NOT_APPLICABLE_OPTION;
}

export function isNotesOption(value) {
  return value === NOTES_OPTION || value === LEGACY_OTHER_OPTION;
}

export function isOptionSelected(value = [], option) {
  if (!Array.isArray(value)) {
    return false;
  }

  if (isNotesOption(option)) {
    return value.some(isNotesOption);
  }

  return value.includes(option);
}

export function normalizeSelectValue(value) {
  return value === LEGACY_OTHER_OPTION ? NOTES_OPTION : value;
}

export function withNotesOption(options = []) {
  if (!Array.isArray(options)) {
    return options;
  }

  return options.map((option) => (option === LEGACY_OTHER_OPTION ? NOTES_OPTION : option));
}

export function withNotApplicable(options = []) {
  if (!Array.isArray(options) || options.includes(NOT_APPLICABLE_OPTION)) {
    return options;
  }

  const notesIndex = options.findIndex(isNotesOption);
  if (notesIndex === -1) {
    return [...options, NOT_APPLICABLE_OPTION];
  }

  return [
    ...options.slice(0, notesIndex),
    NOT_APPLICABLE_OPTION,
    ...options.slice(notesIndex),
  ];
}

export function positiveSelections(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item) => !isNotApplicableOption(item) && !isNotesOption(item));
}

export function hasPositiveResponse(value) {
  if (Array.isArray(value)) {
    return positiveSelections(value).length > 0;
  }

  return Boolean(value) && !isNotApplicableOption(value) && !isNotesOption(value);
}

export function toggleOptionSelection(value = [], option) {
  if (isOptionSelected(value, option)) {
    if (isNotesOption(option)) {
      return value.filter((item) => !isNotesOption(item));
    }

    return value.filter((item) => item !== option);
  }

  if (isNotesOption(option)) {
    return [...value.filter((item) => !isNotesOption(item)), NOTES_OPTION];
  }

  if (isNotApplicableOption(option)) {
    return [...value.filter(isNotesOption), NOT_APPLICABLE_OPTION];
  }

  return [...value.filter((item) => !isNotApplicableOption(item)), option];
}
