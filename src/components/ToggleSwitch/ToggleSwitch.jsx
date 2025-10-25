
import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

export default function ToggleSwitch() {
  const { unit, setUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={unit === "C"}
        onChange={() => setUnit(unit === "F" ? "C" : "F")}
      />
      <span className="toggle-switch__slider"></span>
      <span className={`toggle-switch__label toggle-switch__label-f${unit === "F" ? " toggle-switch__label--active" : ""}`}>F</span>
      <span className={`toggle-switch__label toggle-switch__label-c${unit === "C" ? " toggle-switch__label--active" : ""}`}>C</span>
    </label>
  );
}
