export default async function getEventResults(conn, req, callback) {
  conn.connect(async (e) => {
    const pdga_no = parseInt(req.params.pdga_no);
    const event_id = req.query.event_id;
    const query = `select event_id
      from event_results
      where pdga_no = ?
      and annual_event_id = ?
      and event_rating > 0`;
    conn.query(query, [pdga_no, event_id], (e, result) => {
      return callback(result);
    });
  });
}