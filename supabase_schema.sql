-- Supabase Database Schema

-- 1. usage_logs 테이블 생성
-- 에이전트가 실행될 때마다 기록을 남겨 관리비 청구 근거로 활용함.
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id VARCHAR(255) NOT NULL,
    action_type VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX idx_usage_logs_agent_id ON public.usage_logs(agent_id);
CREATE INDEX idx_usage_logs_created_at ON public.usage_logs(created_at);

-- Row Level Security (RLS) 설정
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- 정책 설정 (삽입/조회 권한)
CREATE POLICY "Enable insert for authenticated users only" ON public.usage_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all log entries" ON public.usage_logs
    FOR SELECT USING (auth.role() = 'authenticated');
