export default function MyInput(props) {
  return (
    <input
      value={props.inputValue}
      onChange={(event) => {
        props.setInputValue(event.target.value);
      }}
      type="text"
      className="my-input"
    />
  );
}
