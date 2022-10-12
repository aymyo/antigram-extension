import { Component } from "solid-js";

interface SwitchInputProps {
  id: string;
  label: string;
  checked: boolean;
  onChange?: () => void;
}

import "./SwitchInput.css";

const SwitchInput: Component<SwitchInputProps> = ({ id, label, checked, onChange }) => {
  return (
    <label class="switchLabel" for={id}>
      {label}
      <span class="switchToggle">
        <input type="checkbox" checked={checked} id={id} name={label} onchange={onChange} />
        <span class="slider"></span>
      </span>
    </label>
  );
};

export { SwitchInput };
