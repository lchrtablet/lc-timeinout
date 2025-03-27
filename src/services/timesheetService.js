const timesheetService = {
  clock: async (action, employeeId) => {
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyc7dNGPp6Rlt6IulCri9M0Gi1JpQjD2ycMe3kp4V0QpuXo5JdFEPDtVe2NhYfwN604/exec'; // Replace with your actual URL

      // Validate inputs
      console.log('Requesting API:', { action, employeeId }); // Log the data being sent
      const url = new URL(scriptUrl);
      url.searchParams.append('action', action);
      url.searchParams.append('employee_id', employeeId);

      const response = await fetch(url, {
        redirect: 'follow',
        headers: { 'Accept': 'application/json' },
        credentials: 'omit',
      });

      const result = await response.text();

      // Try parsing as JSON (success case)
      try {
        const data = JSON.parse(result);
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        return {
          success: true,
          message: `Clocked ${action.replace('_', ' ')} successfully!`,
          date: data.data.date,
          time: data.data.time,
          timestamp: new Date().toISOString(),
        };
      } catch {
        return {
          success: false,
          rawResponse: result,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error) {
      console.error('Clock error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  },
};

export default timesheetService;
