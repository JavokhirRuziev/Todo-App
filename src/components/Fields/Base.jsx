import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  placeholder,
  type,
  label,
  field,
  form: { touched, errors, setFieldValue },
  options,
}) => {
  const handleSelectChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    setFieldValue(field.name, selectedOption);
  };
  const handleInputChange = (event) =>
    setFieldValue(field.name, event.target.value);
  return (
    <Box position="relative">
      <Typography variant="body2" mb={1}>
        {label}
      </Typography>
      {type === "select" ? (
        <Select
          fullWidth
          color="secondary"
          value={field.value ? field.value.value : ""}
          onChange={handleSelectChange}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              fontSize: 16,
              borderRadius: "4px",
              color: "black",
              bgcolor: "common.white",
              p: 0,
              border: "none",
              "&:hover": {
                bgcolor: "grey.100",
              },
              fieldset: {},
              "&.Mui-focused fieldset": {
                zIndex: 2,
              },
              "&.Mui-focused": {
                bgcolor: "grey.100",
              },
            },
            "& .MuiOutlinedInput-input": {
              height: "auto",
              p: 1.3,
              borderRadius: "4px",
              "&::placeholder": {
                color: "grey.400",
                fontSize: 16,
                opacity: 1,
              },
            },
          }}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          fullWidth
          color="secondary"
          placeholder={placeholder}
          type={type}
          value={field.value}
          onChange={handleInputChange}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              fontSize: 16,
              borderRadius: "4px",
              color: "black",
              bgcolor: "common.white",
              p: 0,
              "&:hover": {
                bgcolor: "grey.100",
              },
              "&.Mui-focused fieldset": {
                zIndex: 2,
              },
              "&.Mui-focused": {
                bgcolor: "grey.100",
              },
            },
            "& .MuiOutlinedInput-input": {
              height: "auto",
              p: 1.2,
              borderRadius: "4px",
              "&::placeholder": {
                color: "grey.400",
                fontSize: 16,
                opacity: 1,
              },
            },
          }}
        />
      )}
      {touched[field.name] && errors[field.name] && (
        <Typography sx={textStyles} variant="body2">
          {errors[field.name]}
        </Typography>
      )}
    </Box>
  );
};

const textStyles = {
  position: "absolute",
  bottom: -5,
  color: "#d63333",
  transition: "0.3s",
};
