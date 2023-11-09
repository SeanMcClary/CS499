export async function GET() {
    console.log("hello")
    try {
        const response = await fetch('http://localhost:3001/', {
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
        console.log(data);
        return Response.json(data);
      } catch (error) {
        console.error('Error:', error);
      }
      
}
  
  