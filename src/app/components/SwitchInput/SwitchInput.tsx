import { Component } from "solid-js";

interface SwitchInputProps {
  id: string;
  label: string;
  checked: boolean;
  onChange?: () => void;
}

import "./SwitchInput.css";

const SwitchInput: Component<SwitchInputProps> = (props) => {
  return (
    <label class="switchLabel" for={props.id}>
      {props.label}
      <span class="switchToggle">
        <input
          type="checkbox"
          checked={props.checked}
          id={props.id}
          name={props.label}
          onchange={props.onChange}
        />
        <span class="slider"></span>
      </span>
    </label>
  );
};

export { SwitchInput };
