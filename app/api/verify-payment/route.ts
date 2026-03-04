import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: 'Payment reference is required' }, { status: 400 });
    }

    // Verify with Paystack server-side
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data.status !== 'success') {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Update contract record to confirmed paid
    // Find contract by payment_reference (the reference we saved when creating the contract)
    const { data: contractData, error: findError } = await supabaseAdmin
      .from('contracts')
      .select('id')
      .eq('payment_reference', reference)
      .eq('type', 'payment')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findError) {
      console.error('Error finding contract:', findError);
      return NextResponse.json({ error: 'Failed to find contract' }, { status: 500 });
    }

    if (!contractData) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    const { error: updateError } = await supabaseAdmin
      .from('contracts')
      .update({ 
        payment_status: 'paid'
      })
      .eq('id', contractData.id);

    if (updateError) {
      console.error('Error updating contract:', updateError);
      return NextResponse.json({ error: 'Failed to update contract' }, { status: 500 });
    }

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
