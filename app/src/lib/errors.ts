export function friendlyError(error: unknown): string {
  if (!error) return "An unknown error occurred.";

  const errObj = typeof error === "object" && error !== null ? (error as Record<string, unknown>) : {};
  const errStr = typeof error === "string" ? error : (errObj.message as string) || String(error);

  // 1. User wallet rejection
  if (
    errStr.includes("User rejected") ||
    errStr.includes("rejected the request") ||
    errStr.includes("Transaction rejected")
  ) {
    return "Transaction cancelled by user.";
  }

  // 2. Insufficient SOL
  if (
    errStr.includes("insufficient lamports") ||
    errStr.includes("insufficient funds") ||
    errStr.includes("Attempt to debit an account but found no record of a prior credit")
  ) {
    return "Insufficient SOL in wallet to pay transaction rent and fees.";
  }

  // 3. Anchor Program Error Codes (6000 - 6006)
  const nestedError = errObj.error as { errorCode?: { code?: string; number?: number } } | undefined;
  const errorCode =
    nestedError?.errorCode?.code ||
    (typeof errObj.code === "string" ? errObj.code : undefined) ||
    (Array.isArray(errObj.logs) ? parseErrorCodeFromLogs(errObj.logs as string[]) : undefined);

  const errorNumber =
    nestedError?.errorCode?.number ||
    (typeof errObj.code === "number" ? errObj.code : undefined);

  if (errorCode === "NameEmpty" || errorNumber === 6000 || errStr.includes("NameEmpty")) {
    return "Program name cannot be empty.";
  }
  if (errorCode === "NameTooLong" || errorNumber === 6001 || errStr.includes("NameTooLong")) {
    return "Program name exceeds 32 bytes.";
  }
  if (errorCode === "InvalidRewardCost" || errorNumber === 6002 || errStr.includes("InvalidRewardCost")) {
    return "Reward cost must be greater than zero.";
  }
  if (errorCode === "Unauthorized" || errorNumber === 6003 || errStr.includes("Unauthorized")) {
    return "Signer is not authorized for this loyalty program.";
  }
  if (errorCode === "InvalidAmount" || errorNumber === 6004 || errStr.includes("InvalidAmount")) {
    return "Points amount must be greater than zero.";
  }
  if (errorCode === "InsufficientPoints" || errorNumber === 6005 || errStr.includes("InsufficientPoints")) {
    return "Customer has insufficient points balance.";
  }
  if (errorCode === "MathOverflow" || errorNumber === 6006 || errStr.includes("MathOverflow")) {
    return "Arithmetic operation resulted in an overflow.";
  }

  // 4. Anchor Constraint Errors
  if (errorCode === "ConstraintSeeds" || errorNumber === 2006 || errStr.includes("ConstraintSeeds")) {
    return "Account seeds constraint violated or invalid PDA.";
  }
  if (errorCode === "AccountNotInitialized" || errorNumber === 3012 || errStr.includes("AccountNotInitialized")) {
    return "Account has not been initialized yet.";
  }
  if (errorCode === "ConstraintTokenOwner" || errorNumber === 2015 || errStr.includes("ConstraintTokenOwner")) {
    return "Token account owner constraint violated.";
  }

  return errStr.length > 120 ? `${errStr.slice(0, 117)}...` : errStr;
}

function parseErrorCodeFromLogs(logs: string[]): string | undefined {
  for (const log of logs) {
    const match = log.match(/Error Code: ([A-Za-z0-9]+)/);
    if (match) return match[1];
  }
  return undefined;
}
