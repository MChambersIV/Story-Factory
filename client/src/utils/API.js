export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    
  });
};


export const createUser = (data) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
};

export const loginUser = (data) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
};

export const postSnippet = (data) => {
  return fetch('/api/snippets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

};

export const getAllStories = () => {
  return fetch('/api/stories/', {
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const getSingleStory = (storyName) => {
  return fetch(`/api/stories/${storyName}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const postStory = (data) => {
  return fetch('/api/stories/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

};

export const getSnippetByUserName = (username) => {
  return fetch(`/api/snippets/${username}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
