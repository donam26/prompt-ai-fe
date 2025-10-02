import type { Topic } from "../entities/prompt";

export interface TopicFormData {
  readonly id?: string | number;
  readonly name: string;
  readonly description?: string;
}

/**
 * Props for the TopicHeader component
 */
export interface TopicHeaderProps {
  readonly onAddTopic: () => void;
}

/**
 * Filter state interface for topic filtering
 */
export interface TopicFilterState {
  searchTerm: string;
  dateFrom: string;
  dateTo: string;
}

/**
 * Props for topic form component
 */
export interface TopicFormProps {
  readonly topic?: Topic;
  readonly onSubmit: (data: TopicFormData) => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
  readonly errors?: Partial<Record<keyof TopicFormData, string>>;
}

/**
 * Props for topic table columns
 */
export interface TopicColumnHandlers {
  readonly onEdit?: (topic: Topic) => void;
  readonly onDelete?: (topic: Topic) => void;
}

/**
 * Props for topic delete modal
 */
export interface TopicDeleteModalProps {
  readonly topic?: Topic | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly isLoading?: boolean;
}
