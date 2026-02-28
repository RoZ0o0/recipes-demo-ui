import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

const EditIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
  </SvgIcon>
);

export default EditIcon;
