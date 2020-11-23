// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
        lingerie: 'lingerie',
        bras: 'bras',
        balcony_bras: 'bras/balcony-bras' 
    }))
  }
  