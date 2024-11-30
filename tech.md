`axios` 和 `fetch` 都是用于向服务器发送 HTTP 请求的工具，但它们有一些重要的区别。以下是两者的对比：

### 1. **API 风格和用法**

- **`fetch`**：
  
  - `fetch` 是浏览器内置的原生 API，返回的是一个 `Promise` 对象。
  - 语法上，`fetch` 更为简洁，但它默认不会自动处理响应体，需手动调用 `.json()`、`.text()` 或 `.blob()` 等方法来处理响应内容。
  
  ```javascript
  fetch('/api/data', {
    method: 'GET', // 请求方式
    headers: {
      'Content-Type': 'application/json', // 请求头
    },
  })
    .then(response => response.json()) // 解析响应体为 JSON
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

- **`axios`**：
  
  - `axios` 是第三方库，基于 `Promise`，且提供了更多的功能和便捷的 API，如自动转换 JSON 数据、请求和响应拦截器等。
  - `axios` 会自动将响应体转换为 JSON，无需显式调用 `.json()`。
  
  ```javascript
  axios.get('/api/data')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  ```

### 2. **响应处理**

- **`fetch`**：
  
  - 默认情况下，`fetch` 只有在响应状态码是 2xx 时才会被视为成功。如果服务器返回 404、500 等错误，`fetch` 不会抛出异常，而是返回一个 `Response` 对象，开发者需要手动检查 `response.ok` 或 `response.status` 来判断请求是否成功。
  - 需要手动解析响应体（例如使用 `response.json()`）。
  
  ```javascript
  fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // 手动解析为 JSON
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

- **`axios`**：
  
  - `axios` 会自动处理 HTTP 错误。只要响应状态码不是 2xx，`axios` 就会抛出一个错误，开发者可以通过 `.catch()` 捕获并处理。
  - `axios` 自动解析响应体为 JSON。
  
  ```javascript
  axios.get('/api/data')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  ```

### 3. **请求和响应拦截器**

- **`axios`**：
  
  - `axios` 提供了请求和响应拦截器，允许开发者在请求发送之前或响应接收之后进行处理。可以用来添加认证信息、修改请求或响应数据等。
  
  ```javascript
  // 请求拦截器
  axios.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  });
  
  // 响应拦截器
  axios.interceptors.response.use(response => {
    // 在这里处理响应数据
    return response;
  }, error => {
    // 在这里处理错误
    return Promise.reject(error);
  });
  ```

- **`fetch`**：
  
  - `fetch` 不直接支持拦截器，需要手动实现，比如通过包装 `fetch` 函数来实现拦截功能。

### 4. **请求取消**

- **`axios`**：
  
  - `axios` 提供了取消请求的功能，可以通过 `CancelToken` 来取消请求。
  
  ```javascript
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  
  axios.get('/api/data', { cancelToken: source.token })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  
  // 取消请求
  source.cancel('Request cancelled');
  ```

- **`fetch`**：
  
  - `fetch` 本身不支持请求取消，但可以使用 `AbortController` 来实现请求取消。
  
  ```javascript
  const controller = new AbortController();
  const signal = controller.signal;
  
  fetch('/api/data', { signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  
  // 取消请求
  controller.abort();
  ```

### 5. **支持浏览器环境**

- **`fetch`**：
  
  - `fetch` 是浏览器原生支持的 API，从 Chrome 42 和其他现代浏览器开始支持，但一些旧版本浏览器（如 Internet Explorer）不支持，需要使用 `polyfill` 来兼容。

- **`axios`**：
  
  - `axios` 是一个独立的库，适用于浏览器和 Node.js，兼容性更好，且无需考虑浏览器的原生支持问题。

### 6. **文件上传**

- **`axios`**：
  
  - `axios` 方便处理文件上传，直接支持 `FormData`，以及文件上传的进度监听。
  
  ```javascript
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  
  axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      console.log('Upload progress:', progressEvent.loaded / progressEvent.total);
    }
  });
  ```

- **`fetch`**：
  
  - 使用 `fetch` 也能处理文件上传，搭配 `FormData` 使用，但没有 `axios` 提供的上传进度监听。
  
  ```javascript
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

### 7. **默认超时设置**

- **`axios`**：
  
  - `axios` 允许设置请求的超时时间，超时后会抛出错误。
  
  ```javascript
  axios.get('/api/data', { timeout: 5000 }) // 设置超时为 5000 毫秒
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  ```

- **`fetch`**：
  
  - `fetch` 没有内建的超时设置，但可以通过 `AbortController` 配合实现。
  
  ```javascript
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 设置超时为 5000 毫秒
  
  fetch('/api/data', { signal: controller.signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
    .finally(() => clearTimeout(timeoutId));
  ```

# 