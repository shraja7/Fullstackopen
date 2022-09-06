import React from "react";

const PersonForm = ({
  handleSubmit,
  handleNameChange,
  handlePhoneChange,
  name,
  phone,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={name} />
      </div>
      <div>
        number: <input onChange={handlePhoneChange} value={phone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
