/* Author: Shaban Mohammedsaani Hassan */

export type Name = {
  salutation: string | boolean;
  firstName: string;
  lastName: string;
  initials: string;
  suffix: string | boolean;
};

/* Detect is in array */
const InArray = (arr: Array<string>, value: string): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
};

const Implode = (arr: Array<string>, separator: string): string => {
  let output = "";
  let sep = "";

  for (let i = 0; i < arr.length; i++) {
    output += sep + arr[i];
    sep = separator;
  }
  return output;
};

const Trim = (str: string): string => {
  return str.replace(/^\s+|\s+$|\\,$/g, "");
};

const UpperFirst = (str: string): string => {
  return str.substring(0, 1).toUpperCase() + str.substr(1, str.length - 1).toLowerCase();
};

/* Detect and format standard salutations */
const IsSalatuation = (word: string): string | boolean => {
  /* ignore periods */
  word = word.replace(".", "").toLowerCase();

  let value: string | boolean = false;
  /* Returns normalized values */
  switch (word) {
    case "mr":
    case "master":
    case "mister":
      value = "Mr.";
      break;
    case "mrs":
      value = "Mrs.";
      break;
    case "miss":
    case "ms":
      value = "Ms.";
      break;
    case "dr":
      value = "Dr.";
      break;
    case "rev":
      value = "Rev.";
      break;
    case "fr":
      value = "Fr.";
      break;
  }

  return value;
};

/* Detect and format common suffixes */
const IsSuffix = (word: string): string | boolean => {
  /* Remove periods */
  word = word.replace(/\./g, "").toLowerCase();

  const suffixes = [
    "AB",
    "BA",
    "BS",
    "BE",
    "BFA",
    "BTech",
    "LLB",
    "BSc",
    "MA",
    "MS",
    "MFA",
    "LLM",
    "MLA",
    "MBA",
    "MSC",
    "MEng",
    "JD",
    "MD",
    "DO",
    "PharmD",
    "DMin",
    "PhD",
    "EdD",
    "DPhil",
    "DBA",
    "LLD",
    "EngD",
    "APR",
    "RPh",
    "PE",
    "DMD",
    "CME",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "Senior",
    "Snr",
    "Sr",
    "Junior",
    "Jnr",
    "Jr",
  ];

  for (let i = 0; i < suffixes.length; i++) {
    if (suffixes[i].toLowerCase() === word) {
      return suffixes[i];
    }
  }
  return false;
};

/* Detect compound last name */
const IsCompoundLastName = (word: string): boolean => {
  word = word.toLowerCase();

  const words = [
    "a",
    "ab",
    "af",
    "ap",
    "abu",
    "ait",
    "al",
    "alam",
    "at",
    "ath",
    "aust",
    "austre",
    "bar",
    "bath",
    "bat",
    "ben",
    "bin",
    "ibn",
    "bet",
    "bint",
    "binti",
    "binte",
    "da",
    "das",
    "de",
    "degli",
    "del",
    "dele",
    "della",
    "der",
    "di",
    "dos",
    "du",
    "e",
    "el",
    "fetch",
    "vetch",
    "fitz",
    "i",
    "ka",
    "kil",
    "gil",
    "la",
    "le",
    "lille",
    "lu",
    "m",
    "mac",
    "mc",
    "mck",
    "mhic",
    "mic",
    "mala",
    "mellom",
    "myljom",
    "na",
    "ned",
    "nedre",
    "neder",
    "nga",
    "nic",
    "ni",
    "nin",
    "nord",
    "norr",
    "nordre",
    "ny",
    "o",
    "ua",
    "ui",
    "opp",
    "upp",
    "ofver",
    "ost",
    "oster",
    "ostre",
    "over",
    "ovre",
    "oz",
    "pietro",
    "pour",
    "putra",
    "putera",
    "putri",
    "puteri",
    "setia",
    "setya",
    "st",
    "st.",
    "stor",
    "soder",
    "sor",
    "sonder",
    "sor",
    "syd",
    "sondre",
    "syndre",
    "sore",
    "te",
    "ter",
    "tre",
    "van",
    "van de",
    "van den",
    "van der",
    "van het",
    "vast",
    "vaster",
    "verch",
    "erch",
    "vere",
    "vest",
    "vestre",
    "vesle",
    "vetle",
    "von",
    "war",
    "zu",
  ];

  return InArray(words, word);
};

/* Detect if it is initial */
const IsInitial = (word: string): boolean => {
  /* Remove periods */
  word = word.replace(".", "");
  return word.length === 1;
};

/* Detect mixed case words like McCarthy */
const IsPascalCase = (word: string): boolean => {
  const pascalRegex = /^[A-Z][A-Za-z]*$/;

  return pascalRegex.test(word);
};

/* Safe Upper first letter */
const SafeUpperFirst = (separator: string, word: string): string => {
  const words: Array<string> = [];
  /* uppercase words split by the separator eg: dash or period */
  const parts = word.split(separator);

  for (let i = 0; i < parts.length; i++) {
    words[i] = IsPascalCase(parts[i]) ? parts[i] : UpperFirst(parts[i]);
  }

  return Implode(words, separator);
};

/* Upper case first words split by dash or period */
const FixCase = (word: string): string => {
  /* uppercase words split by dashes */
  word = SafeUpperFirst("-", word);
  /* uppercase words split by dashes */
  word = SafeUpperFirst(".", word);
  return word;
};

const splitter = (fullname: string) => {
  fullname = Trim(fullname);
  /* Split into words */
  const parts = fullname.split(" ");
  const name: Name = {
    salutation: "",
    firstName: "",
    lastName: "",
    initials: "",
    suffix: "",
  };
  const nameParts: Array<string> = [];
  let firstName = "";
  let lastName = "";
  let initials = "";

  let i = 0;
  let j = 0;

  /* Ignore any words in parentheses */
  for (i = 0; i < parts.length; i++) {
    if (parts[i].indexOf("(") === -1) {
      nameParts[j++] = parts[i];
    }
  }
  const numOfWords = nameParts.length;
  /* Is the first word a title*/
  const salutation = IsSalatuation(nameParts[0]);
  /* Is last word a suffix */
  const suffix = IsSuffix(nameParts[nameParts.length - 1]);

  /* Set the range for the middle part of the name (trim salutation & suffixes) */
  const start = salutation ? 1 : 0;
  const end = suffix ? numOfWords - 1 : numOfWords;

  /* Concat the first name */
  let word = "";
  for (i = start; i < end - 1; i++) {
    word = nameParts[i];
    /*
     * move on to parsing the last name if we find an indicator of a compound
     * last name (Von, Van, etc)
     * we use i != start to allow for rare cases where an indicator is actually
     * the first name (like "Von Fabella")
     */
    if (IsCompoundLastName(word) && i !== start) {
      break;
    }

    if (IsInitial(word)) {
      /* Is the initial the first word */
      if (i === start) {
        /*
         * if so, do a look-ahead to see if they go by their middle name
         * for ex: "P. Lewis Brown" => "Lewis Brown" & "P." is stored as an initial
         * but "P. L. Brown" => "P. Brown" and "L."  is stored as an initial
         */
        if (IsInitial(nameParts[i + 1])) {
          firstName += " " + word.toUpperCase();
        } else {
          initials += " " + word.toUpperCase();
        }
        /* otherwise just go ahead and save the initial */
      } else {
        initials += " " + word.toUpperCase();
      }
    } else {
      firstName += " " + FixCase(word);
    }
  }

  /* Check if we have more than one word in the string */
  if (end - start > 1) {
    /* concat the last name */
    for (j = i; j < end; j++) {
      lastName += " " + FixCase(nameParts[j]);
    }
  } else {
    /* Otherwise, single word strings are assumed to be first names */
    firstName = FixCase(nameParts[i]);
  }

  name.salutation = salutation !== false ? salutation : "";
  name.firstName = firstName !== "" ? Trim(firstName) : "";
  name.lastName = lastName !== "" ? Trim(lastName) : "";
  name.initials = initials !== "" ? Trim(initials) : "";
  name.suffix = suffix !== false ? suffix : "";

  return name;
};

export default splitter;
