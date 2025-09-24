interface CustomSelectIconProps {
  IconName: React.ElementType;
  label: string;
  labelClassName?: string;
}

const CustomSelect: React.FC<CustomSelectIconProps> = ({ IconName, label, labelClassName }) => (
  <div className={`flex items-center`}>
    <IconName style={{ marginRight: 6 }} />
    <span className={`${labelClassName}`}>{label}</span>
  </div>
);

export default CustomSelect;
