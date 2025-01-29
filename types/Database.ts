export interface Database {
    public: {
        Tables: {
            tasks: {
                Row: {
                    id: string
                    user_name?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                }
                Insert: {
                    id: string
                    user_name?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                }
                Update: {
                    id: string
                    user_name?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}