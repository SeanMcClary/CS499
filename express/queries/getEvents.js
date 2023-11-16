export default function getEvetns(conn, req, res) {
  conn.connect((e) => {
    if (req.query.pdga_no) {
      const pdga_no = parseInt(req.query.pdga_no);
      const query = `select distinct b.event_name, b.city, b.state, b.country from event_results a
        join events b on a.annual_event_id = b.id
        where a.pdga_no = ?`
      conn.query(query, [pdga_no], (e, result) => {
        res.json(result);
      });
    } else {
      const query = 'select event_name, city, state, country from events'
      conn.query(query, (e, result) => {
        res.json(result);
      });
    }
  });
}
