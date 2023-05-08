import React from 'react';
import ReactPDF, { Page, Text, Document, Image } from '@react-pdf/renderer';
import * as Yup from 'yup';
import { getScreenshot } from '../../screenshot'


class MakePdfController {
  async send(req, res) {

    const schema = Yup.object().shape({
     message: Yup.string().required(),
    });

    if (!(await schema.isValid({message:req.query.message}))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await getScreenshot('https://www.theverge.com/', 'theverge-snap');
    await getScreenshot('https://www.artstation.com/','artstation-snap');

    const MyDocument = () => (
      <Document>
        <Page>
          <Text>{`${req.query.message} page 1`}</Text>
          <Image src="http://localhost:3333/files/theverge-snap.png" />
        </Page>
        <Page>
          <Text>{`${req.query.message} page 2`}</Text>
          <Image src="http://localhost:3333/files/artstation-snap.png" />
        </Page>
      </Document>
    );

    const pdfStream = await ReactPDF.renderToStream(<MyDocument />);
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
    pdfStream.on('end', () => console.log('Done streaming, response sent.'));

  }
}

export default new MakePdfController();
