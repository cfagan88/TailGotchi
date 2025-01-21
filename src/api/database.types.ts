export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      pets: {
        Row: {
          breed: string | null;
          created_at: string;
          gender: string | null;
          pet_age: number | null;
          pet_care_info: string | null;
          pet_dislikes: string | null;
          pet_id: number;
          pet_likes: string | null;
          pet_name: string;
        };
        Insert: {
          breed?: string | null;
          created_at?: string;
          gender?: string | null;
          pet_age?: number | null;
          pet_care_info?: string | null;
          pet_dislikes?: string | null;
          pet_id?: number;
          pet_likes?: string | null;
          pet_name: string;
        };
        Update: {
          breed?: string | null;
          created_at?: string;
          gender?: string | null;
          pet_age?: number | null;
          pet_care_info?: string | null;
          pet_dislikes?: string | null;
          pet_id?: number;
          pet_likes?: string | null;
          pet_name?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          CompletionDate: number | null;
          CreationDate: number;
          is_completed: boolean | null;
          pet_id: number;
          task_id: number;
          task_info: string | null;
          task_name: string;
          assigned_user:string;
          DueDate:number;
          task_difficulty:string;
        };
        Insert: {
          CompletionDate?: number | null;
          CreationDate: number;
          is_completed?: boolean | null;
          pet_id: number;
          task_id?: number;
          task_info?: string | null;
          task_name: string;
          assigned_user:string;
          DueDate:number;
          task_difficulty:string;
        };
        Update: {
          CompletionDate?: number | null;
          CreationDate?: number;
          is_completed?: boolean | null;
          pet_id?: number;
          task_id?: number;
          task_info?: string | null;
          task_name?: string;
          assigned_user?:string;
          DueDate?:number;
          task_difficulty?:string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_pet_id_fkey1";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pets";
            referencedColumns: ["pet_id"];
          }
        ];
      };
      users: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [];
      };
      users_pets: {
        Row: {
          pet_id: number;
          user_id: string;
          user_pet_id: number;
          task_points:number;
        };
        Insert: {
          pet_id: number;
          user_id: string;
          user_pet_id?: number;
          task_points:number;
        };
        Update: {
          pet_id?: number;
          user_id?: string;
          user_pet_id?: number;
          task_points?:number;
        };
        Relationships: [
          {
            foreignKeyName: "users_pets_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pets";
            referencedColumns: ["pet_id"];
          },
          {
            foreignKeyName: "users_pets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users_profiles";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users_profiles: {
        Row: {
          avatar_url: string | null;
          name: string | null;
          user_id: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          name?: string | null;
          user_id: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          name?: string | null;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
