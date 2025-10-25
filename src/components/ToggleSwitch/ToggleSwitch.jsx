
import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__slider"></span>
      <span className={`toggle-switch__label toggle-switch__label-f${currentTemperatureUnit === "F" ? " toggle-switch__label--active" : ""}`}>F</span>
      <span className={`toggle-switch__label toggle-switch__label-c${currentTemperatureUnit === "C" ? " toggle-switch__label--active" : ""}`}>C</span>
    </label>
  );
}
