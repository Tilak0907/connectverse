import { useState, useEffect } from "react";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/conversations");
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
