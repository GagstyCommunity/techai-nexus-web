export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          category: string | null
          content: Json | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: number | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_avatar?: string | null
          author_name?: string | null
          category?: string | null
          content?: Json | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string | null
          category?: string | null
          content?: Json | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge: string | null
          client_logo: string | null
          client_name: string | null
          content: Json | null
          created_at: string | null
          description: string | null
          featured_image: string | null
          gallery_images: string[] | null
          id: string
          industry: string | null
          meta_description: string | null
          meta_title: string | null
          project_duration: string | null
          results: Json | null
          slug: string
          solution: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          team_size: number | null
          technologies: string[] | null
          testimonial_author: string | null
          testimonial_position: string | null
          testimonial_quote: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          challenge?: string | null
          client_logo?: string | null
          client_name?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          id?: string
          industry?: string | null
          meta_description?: string | null
          meta_title?: string | null
          project_duration?: string | null
          results?: Json | null
          slug: string
          solution?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          team_size?: number | null
          technologies?: string[] | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          testimonial_quote?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          challenge?: string | null
          client_logo?: string | null
          client_name?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          id?: string
          industry?: string | null
          meta_description?: string | null
          meta_title?: string | null
          project_duration?: string | null
          results?: Json | null
          slug?: string
          solution?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          team_size?: number | null
          technologies?: string[] | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          testimonial_quote?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json | null
          created_at: string | null
          description: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          canonical_url: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_type: string
          robots_directive: string | null
          structured_data: Json | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_type: string
          robots_directive?: string | null
          structured_data?: Json | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_type?: string
          robots_directive?: string | null
          structured_data?: Json | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: Database["public"]["Enums"]["service_category"] | null
          content: Json | null
          created_at: string | null
          description: string | null
          featured_image: string | null
          features: string[] | null
          icon: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          pricing_info: Json | null
          short_description: string | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"] | null
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["service_category"] | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          pricing_info?: Json | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"] | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["service_category"] | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          pricing_info?: Json | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"] | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      solutions: {
        Row: {
          benefits: string[] | null
          category: Database["public"]["Enums"]["solution_category"] | null
          content: Json | null
          created_at: string | null
          description: string | null
          featured_image: string | null
          features: string[] | null
          icon: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          short_description: string | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"] | null
          target_audience: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          category?: Database["public"]["Enums"]["solution_category"] | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"] | null
          target_audience?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          category?: Database["public"]["Enums"]["solution_category"] | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"] | null
          target_audience?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_avatar: string | null
          client_company: string | null
          client_name: string
          client_position: string | null
          created_at: string | null
          featured: boolean | null
          id: string
          project_type: string | null
          rating: number | null
          status: Database["public"]["Enums"]["content_status"] | null
          testimonial_text: string
          updated_at: string | null
        }
        Insert: {
          client_avatar?: string | null
          client_company?: string | null
          client_name: string
          client_position?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          project_type?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["content_status"] | null
          testimonial_text: string
          updated_at?: string | null
        }
        Update: {
          client_avatar?: string | null
          client_company?: string | null
          client_name?: string
          client_position?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          project_type?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["content_status"] | null
          testimonial_text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tool_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          session_id: string | null
          tool_name: string
          user_agent: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          session_id?: string | null
          tool_name: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          session_id?: string | null
          tool_name?: string
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_status: "draft" | "published" | "archived"
      service_category:
        | "ai-tools"
        | "ai-automation"
        | "web3"
        | "web-development"
        | "growth-hacking"
        | "devops"
        | "ui-ux"
        | "launch-lab"
      solution_category:
        | "saas"
        | "ecommerce"
        | "fintech"
        | "healthcare"
        | "education"
        | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_status: ["draft", "published", "archived"],
      service_category: [
        "ai-tools",
        "ai-automation",
        "web3",
        "web-development",
        "growth-hacking",
        "devops",
        "ui-ux",
        "launch-lab",
      ],
      solution_category: [
        "saas",
        "ecommerce",
        "fintech",
        "healthcare",
        "education",
        "enterprise",
      ],
    },
  },
} as const
