import { splitter } from "../index";

const names = [
  {
    name: "Shaban Hassan",
    result: {
      salutation: "",
      firstName: "Shaban",
      lastName: "Hassan",
      initials: "",
      suffix: "",
    },
  },
  {
    name: "Salman Ibn Faris",
    result: {
      salutation: "",
      firstName: "Salman",
      lastName: "Ibn Faris",
      initials: "",
      suffix: "",
    },
  },
  {
    name: "Mr. Mario De Vacelo Parirato IV",
    result: {
      salutation: "Mr.",
      firstName: "Mario",
      lastName: "De Vacelo Parirato",
      initials: "",
      suffix: "IV",
    },
  },
];

describe("Verify name splitting", () => {
  test("Should match results", () => {
    names.forEach((item) => {
      expect(splitter(item.name)).toStrictEqual(item.result);
    });
  });
});
