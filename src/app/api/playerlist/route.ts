export async function GET() {
    console.log("playerlist log")
    try {
        const response = await fetch('http://localhost:3001/players', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        //console.log(data);
        
        return Response.json(data.sort((a, b) => {
            const nameA = a.l_name.toUpperCase();
            const nameB = b.l_name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0
        }));
    } catch (error) {
        console.error('Error:', error);
    }
      
}
  
  