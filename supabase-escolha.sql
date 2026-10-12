-- Permite que a proposta guarde o que o cliente escolheu no "Monte o seu pacote".
-- O cliente só consegue gravar o campo "escolha" da própria proposta (pelo código do link).
create or replace function public.salvar_escolha(p_slug text, p_escolha jsonb)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if p_escolha is null or jsonb_typeof(p_escolha) <> 'object' or length(p_escolha::text) > 5000 then
    raise exception 'escolha invalida';
  end if;
  update public.propostas
     set dados = jsonb_set(dados, '{escolha}', p_escolha, true)
   where slug = p_slug;
end;
$$;

revoke all on function public.salvar_escolha(text, jsonb) from public;
grant execute on function public.salvar_escolha(text, jsonb) to anon, authenticated;
