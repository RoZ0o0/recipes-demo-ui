import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

const DeleteIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} htmlColor="#f44336">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z" />
  </SvgIcon>
);

export default DeleteIcon;
