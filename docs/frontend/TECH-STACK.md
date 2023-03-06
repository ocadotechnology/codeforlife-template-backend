# Frontend Technology Stack

This document details the stack of technologies all CodeForLife frontend's will rely on. This graph, from bottom to top, describes the technologies used and what they provide to the next layer.

```mermaid
graph BT;
    css -->|stylized components| scss -->|syntax preprocessing| react;
    javascript -->|component functionality| typescript -->|type safety| react & redux;
    react -->|UI components| react-redux;
    redux -->|global state management| react-redux;
    redux --> redux-toolkit;
    react-redux -->|react-redux integration| _frontend_app_;
    redux-toolkit -->|boilerplate generators| _frontend_app_;
```

## Programming Language

Our front end 

