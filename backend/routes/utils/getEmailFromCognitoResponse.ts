// TODO ramda ?
const extractEmailFromCognito = (array: any[]) => {
  const emailObj = array.find((obj) => obj.Name === "email");
  if (emailObj) {
    return emailObj.Value;
  }
  return "";
};

export default extractEmailFromCognito;
