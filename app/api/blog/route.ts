import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request, Response: Response) {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');

    if (id === "*") {
        const result = await supabase
            .from('blog')
            .select('id')
            .limit(10);

        return NextResponse.json({ ...result })

    } else if (id) {
        const result = await supabase
            .from('blog')
            .select('*')
            .eq('id', id)
            .single();

        return NextResponse.json({ ...result });
    }

    return NextResponse.json({});
}