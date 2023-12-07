export async function GET(request: Request, { params: { pdga_no } }: { params: { pdga_no: number }}) {
    const { searchParams } = new URL(request.url);
    const event_id = searchParams.get('event_id');
      try {
          const response = await fetch((`http://localhost:3001/players/${pdga_no}/model?event_id=${event_id}`), {
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
          
          return Response.json(data);
      } catch (error) {
          console.error('Error:', error);
      }
        
  }
    
    