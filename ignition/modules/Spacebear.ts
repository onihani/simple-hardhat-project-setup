// imports
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SpaceBearModule = buildModule("Spacebear", (m) => {
  const owner = m.getAccount(0);
  const spacebear = m.contract("Spacebear", [owner]);
  return { spacebear };
});

export default SpaceBearModule;
