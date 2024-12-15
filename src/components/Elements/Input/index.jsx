import Label from "./Label";
import Input from "./Input";

const InputForm = (props) => {
  const { label, name, type, placeholder, value, onChange } = props; // Menambahkan onChange di sini
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input 
        name={name} 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}  // Pastikan onChange diteruskan ke Input
      />
    </div>
  );
};

export default InputForm;
