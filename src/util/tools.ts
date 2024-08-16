export const getDate = (ts:number) => {
  let d = new Date(ts*1000);
  let month = ("00" + (d.getMonth() + 1)).slice(-2);
  let day = ("00" + d.getDate()).slice(-2);
  let year = d.getFullYear();

  return month + "/" + day + "/" + year;
};

export const getTime = (ts:number) => {
  let d = new Date(ts*1000);

  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  let newformat = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + seconds).slice(-2) + ' ' + newformat;
};