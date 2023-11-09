export default function getPlayer(conn, req, res) {
  conn.connect((e) => {
    conn.query('select * from players where pdga_no = ?', [req.params.pdga_no], (e, result) => {
      res.json(result);
    });
  });
}
