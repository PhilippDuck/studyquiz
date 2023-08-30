function unixToReadableDate(unixTimestamp) {
    // Erstellt ein neues Date-Objekt basierend auf dem Unix-Timestamp (multipliziert mit 1000, da JavaScript Millisekunden erwartet)
    const date = new Date(unixTimestamp);

    // Formatierung des Datums und der Uhrzeit
    const formattedDate = date.toLocaleDateString(); // z.B. "26.08.2023"
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // z.B. "12:34:56"

    return {
      formattedDate: formattedDate,
      formattedTime: formattedTime
    } 
  }

export default unixToReadableDate;