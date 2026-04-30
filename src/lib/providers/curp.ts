import z from "zod";

const CURP_REGEX =
  /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HMX](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;

export const curpSchema = z
  .string()
  .length(18, "CURP must be 18 characters long")
  .regex(CURP_REGEX, "Invalid CURP format")
  .superRefine((curp, ctx) => {
    // Validate birth date
    const year = parseInt(curp.slice(4, 6), 10);
    const month = parseInt(curp.slice(6, 8), 10);
    const day = parseInt(curp.slice(8, 10), 10);

    // Position 17 defines century:
    // 0-9 => 1900s
    // A-Z => 2000s
    const centuryChar = curp[16];
    const fullYear = /^[0-9]$/.test(centuryChar) ? 1900 + year : 2000 + year;

    const date = new Date(fullYear, month - 1, day);

    if (
      date.getFullYear() !== fullYear ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid birth date in CURP",
      });
    }

    // Validate gender
    const gender = curp[10];
    if (!["H", "M", "X"].includes(gender)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid gender in CURP",
      });
    }

    // Validate check digit
    const expected = calculateCheckDigit(curp.slice(0, 17));
    const actual = curp[17];

    if (expected !== actual) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid check digit",
      });
    }
  });

// Official algorithm to calculate the check digit for CURP
function calculateCheckDigit(curp17: string): string {
  const dictionary = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let sum = 0;

  for (let i = 0; i < 17; i++) {
    const value = dictionary.indexOf(curp17[i]);
    sum += value * (18 - i);
  }

  const digit = 10 - (sum % 10);
  return digit === 10 ? "0" : String(digit);
}

export function validateCURP(curp: string): boolean {
  try {
    curpSchema.parse(curp);
    return true;
  } catch {
    return false;
  }
}
