export const verify = async (appId: string, apiKey: string) => {
  if (!appId.length || !apiKey.length) {
    return false;
  }

  try {
    const response = await fetch(`https://api.applicationinsights.io/v1/apps/${appId}/query`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      method: 'POST',
      body: JSON.stringify({ query: null }),
    });

    return response.ok;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const runQuery = async (appId: string, apiKey: string, query: string) => {
  const response = await fetch(`https://api.applicationinsights.io/v1/apps/${appId}/query`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    method: 'POST',
    body: JSON.stringify({ query: query }),
  });

  return response;
};
