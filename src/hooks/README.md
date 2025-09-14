# React Query Hooks

This directory contains custom React Query hooks for data fetching and state management.

## Overview

React Query (TanStack Query) provides powerful data fetching, caching, and synchronization capabilities for React applications. The custom hooks in this directory wrap React Query functionality with your API calls.

## Available Hooks

### Query Hooks (Data Fetching)

#### `usePrompts(params?)`

Fetches prompts with optional filtering parameters.

```tsx
const {
  data: prompts,
  isLoading,
  error,
} = usePrompts({
  categoryId: 1,
  searchTerm: "AI",
  page: 1,
  limit: 10,
});
```

#### `useCategories()`

Fetches all categories.

```tsx
const { data: categories, isLoading, error } = useCategories();
```

#### `useUser()`

Fetches current user data.

```tsx
const { data: user, isLoading, error } = useUser();
```

#### `useFavorites()`

Fetches user's favorite prompts.

```tsx
const { data: favorites, isLoading, error } = useFavorites();
```

### Mutation Hooks (Data Modification)

#### `useCreatePrompt()`

Creates a new prompt.

```tsx
const createPrompt = useCreatePrompt();

const handleSubmit = data => {
  createPrompt.mutate({
    title: "My Prompt",
    content: "Prompt content...",
    categoryId: 1,
    tags: ["ai", "chatgpt"],
  });
};
```

#### `useUpdatePrompt()`

Updates an existing prompt.

```tsx
const updatePrompt = useUpdatePrompt();

const handleUpdate = (id, data) => {
  updatePrompt.mutate({ id, data });
};
```

#### `useDeletePrompt()`

Deletes a prompt.

```tsx
const deletePrompt = useDeletePrompt();

const handleDelete = id => {
  deletePrompt.mutate(id);
};
```

#### `useToggleFavorite()`

Toggles favorite status of a prompt.

```tsx
const toggleFavorite = useToggleFavorite();

const handleToggle = promptId => {
  toggleFavorite.mutate(promptId);
};
```

### Admin Mutation Hooks

#### `useCreateCategory()`

Creates a new category.

```tsx
const createCategory = useCreateCategory();

const handleCreate = data => {
  createCategory.mutate({
    name: "New Category",
    description: "Category description",
  });
};
```

#### `useUpdateCategory()`

Updates an existing category.

```tsx
const updateCategory = useUpdateCategory();

const handleUpdate = (id, data) => {
  updateCategory.mutate({ id, data });
};
```

#### `useDeleteCategory()`

Deletes a category.

```tsx
const deleteCategory = useDeleteCategory();

const handleDelete = id => {
  deleteCategory.mutate(id);
};
```

## Query Keys

The `queryKeys` object provides consistent query key patterns for cache management:

```tsx
import { queryKeys } from "@/hooks/useApi";

// Use in queryClient.invalidateQueries()
queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
queryClient.invalidateQueries({ queryKey: queryKeys.categories });
```

## Configuration

React Query is configured in `src/providers/QueryProvider.tsx` with the following defaults:

- **Stale Time**: 5 minutes (data stays fresh for 5 minutes)
- **Garbage Collection Time**: 10 minutes (cached data is kept for 10 minutes)
- **Retry**: 3 attempts for queries, 0 for mutations
- **Refetch on Window Focus**: Disabled
- **Refetch on Mount**: Enabled
- **Refetch on Reconnect**: Enabled

## Error Handling

All mutation hooks include automatic error handling with toast notifications:

- Success: Shows success message
- Error: Shows error message from API response

## Example Usage

```tsx
import { usePrompts, useCreatePrompt } from "@/hooks/useApi";

export const MyComponent = () => {
  const { data: prompts, isLoading, error } = usePrompts();
  const createPrompt = useCreatePrompt();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate = () => {
    createPrompt.mutate({
      title: "New Prompt",
      content: "Content here...",
      categoryId: 1,
    });
  };

  return (
    <div>
      {prompts?.map(prompt => (
        <div key={prompt.id}>{prompt.title}</div>
      ))}
      <button onClick={handleCreate}>Create Prompt</button>
    </div>
  );
};
```

## Benefits

1. **Automatic Caching**: Data is cached and shared across components
2. **Background Refetching**: Data stays fresh automatically
3. **Optimistic Updates**: UI updates immediately, rolls back on error
4. **Loading States**: Built-in loading, error, and success states
5. **Deduplication**: Multiple requests for the same data are deduplicated
6. **Offline Support**: Works offline with cached data
7. **DevTools**: React Query DevTools for debugging

## Migration from useEffect

Replace manual data fetching with React Query hooks:

```tsx
// Before (useEffect)
const [prompts, setPrompts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPrompts = async () => {
    try {
      const data = await api.getPrompts();
      setPrompts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchPrompts();
}, []);

// After (React Query)
const { data: prompts, isLoading } = usePrompts();
```
