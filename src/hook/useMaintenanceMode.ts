// src/hooks/useMaintenanceMode.js
import { useState, useEffect } from "react";

const useMaintenanceMode = (): boolean => {
  const [isInMaintenance, setIsInMaintenance] = useState<boolean>(false);

  useEffect(() => {
    const checkMaintenanceStatus = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_WE_API_URL}/maintenace-status`
        );
        const data: {
          metadata: any;
          isInMaintenance: boolean;
        } = await response.json();
        setIsInMaintenance(data.metadata.isInMaintenance);
      } catch (error) {
        setIsInMaintenance(true);
        console.error("Error checking maintenance status:", error);
      }
    };

    checkMaintenanceStatus();
    // Kiểm tra định kỳ, ví dụ mỗi phút
    const interval = setInterval(checkMaintenanceStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return isInMaintenance;
};

export default useMaintenanceMode;
