export const isImage = (str) => {
	if (typeof str === 'string') {
		return(str.match(/\.(jpeg|jpg|gif|png)$/) != null);
	} 
	return null;
}

export const isYoutuVideo = (str) => {
	if (typeof str === 'string') {
		return(str.match(/(youtube|youtu){1}/) != null);
	} 
	return null;
}
