export const today = (yearsToAdd) =>{
	const years = yearsToAdd;
	const date = new Date();
	const strDate = String(date.getMonth()+1).length<2 ? (date.getFullYear()+years) + "-" + "0" + (date.getMonth()+1) + "-" + date.getDate() : (date.getFullYear()+years) + "-" + (date.getMonth()+1) + "-" + date.getDate();
	return strDate;
};

export const normalizeName = (string) => {
	const newString = string.charAt(0).toUpperCase() + string.slice(1,);
	return newString;
};
