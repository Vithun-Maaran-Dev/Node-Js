const generateOtp = async () => {
   return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
};


export default generateOtp