    public abstract class Offer
{
    public Guid OfferId { get; set; } = Guid.NewGuid();
    public string Title { get; set; }
    public string ? Description { get; set; }

    public float? DiscountPercentage { get; set; }

    public DateTime ValidFrom { get; set; }
    public DateTime ValidUntil { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool Activated {get;set;} = false;

    public abstract OfferScope Scope { get; }

    public virtual bool IsActive => DateTime.UtcNow >= ValidFrom && DateTime.UtcNow <= ValidUntil;
}

 public class GameOffer : Offer

{
    public override OfferScope Scope => OfferScope.Game;

    public List<Game> Games_List {get; set;} = new List<Game>();

}

public class CodeOffer : Offer
{
    public override OfferScope Scope => OfferScope.Code;
}

public class OrderOffer : Offer
{
    public override OfferScope Scope => OfferScope.Order;
}



public enum OfferScope
{
    Game,
    Order ,

    Code
}