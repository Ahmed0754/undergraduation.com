export type AppStatus = "Exploring" | "Shortlisting" | "Applying" | "Submitted";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  grade?: number;
  country?: string;
  status: AppStatus;
  lastActive?: Date;
  highIntent?: boolean;
  needsEssayHelp?: boolean;
}

export type InteractionType = "login" | "ai_question" | "doc_upload";

export interface Interaction {
  id: string;
  studentId: string;
  type: InteractionType;
  meta?: Record<string, any>;
  timestamp: Date;
}

export type Channel = "email" | "sms" | "call";

export interface Communication {
  id: string;
  studentId: string;
  channel: Channel;
  subject?: string;
  message: string;
  direction: "outbound" | "inbound";
  timestamp: Date;
}

export interface Note {
  id: string;
  studentId: string;
  note: string;
  createdBy: string;
  timestamp: Date;
}

export interface Reminder {
  id: string;
  studentId: string;
  title: string;
  dueAt: Date;
  assignedTo: string;
  status: "open" | "done";
}
