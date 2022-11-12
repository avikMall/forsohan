import { google } from 'googleapis';

export async function getStaticProps({ query }) {

  // Auth
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  // Query

  const { id } = 0;
  const range = `Sheet1!A:C`;
  const tot = 'Sheet1!F:F';

  // const totCol = await sheets.spreadsheets.values.get({
  //   spreadsheetId: process.env.SHEET_ID,
  //   tot,
  // });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  

  // Result

  const data = response.data.values;
  // const totalVal = totCol.data.values;
  // console.log(data);

  return { 
      props: {
          data,
          // totalVal,
      } 
  }
}

export default function Post({ data }) {
  return (
    <div className='outer'>
      <meta httpEquiv="refresh" content="10" ></meta>
      {/* <div>
        {data.map(function(d, idx) {
          return(<div className={idx}>{d[0]}</div>)
        })}
      </div> */}
      
      <div className='txt'>{data.slice(-1)[0][1] + " - $" + data.slice(-1)[0][0]}</div>
      {/* {totalVal} */}
    </div>
  );
}