export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pdga_no = searchParams.get('pdga_no');
      try {
          const response = await fetch((`http://localhost:3001/events?pdga_no=${pdga_no}`), {
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
          return Response.json(data.sort((a:any, b:any) => {
              const nameA = a.event_name.toUpperCase();
              const nameB = b.event_name.toUpperCase();
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
    
    