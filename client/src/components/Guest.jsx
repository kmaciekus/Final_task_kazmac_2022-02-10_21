import React from "react";



export const Guest = ({guest}) => {
	const { fullName, dob, email} = guest;
	const date = Date.parse(dob);
	const age = Math.floor((Date.now() - date)/31556952000);
  return (
	<tr>
		<td>{fullName}</td>
		<td>{age}</td>
		<td>{email}</td>
	</tr>
  )
}
